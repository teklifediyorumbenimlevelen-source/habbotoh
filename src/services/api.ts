import axios from 'axios';

const API_BASE_URL = 'https://www.habbo.com.tr/api/public';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1395886160248574084/FMhfMB2C1cZvlNYlfbeczZpg5FRtxgvA10gjxYtuhpuStIpr9EhDcQVxbNMhlayTqsSK';

// Habbo API Service
export const habboAPI = {
  async getUserProfile(username: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?name=${username}`);
      return response.data;
    } catch (error) {
      console.error('Habbo API Error:', error);
      throw new Error('Kullanıcı bulunamadı');
    }
  },

  async getUserGroups(username: string) {
    try {
      const userProfile = await this.getUserProfile(username);
      const response = await axios.get(`${API_BASE_URL}/users/${userProfile.uniqueId}/groups`);
      return response.data;
    } catch (error) {
      console.error('Habbo Groups API Error:', error);
      return [];
    }
  },

  async getUserBadges(username: string) {
    try {
      const userProfile = await this.getUserProfile(username);
      const response = await axios.get(`${API_BASE_URL}/users/${userProfile.uniqueId}/badges`);
      return response.data;
    } catch (error) {
      console.error('Habbo Badges API Error:', error);
      return [];
    }
  }
};

// Discord Webhook Service
export const discordAPI = {
  async sendLog(data: {
    title: string;
    description: string;
    color?: number;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    username?: string;
    avatar?: string;
  }) {
    try {
      const embed = {
        title: data.title,
        description: data.description,
        color: data.color || 0xc8102e, // TÖH kırmızısı
        timestamp: new Date().toISOString(),
        footer: {
          text: 'TÖH Yönetim Sistemi',
          icon_url: 'https://images.habbo.com/c_images/album1584/TUR44.gif'
        },
        fields: data.fields || []
      };

      if (data.username) {
        embed.fields?.push({
          name: 'Kullanıcı',
          value: data.username,
          inline: true
        });
      }

      await axios.post(DISCORD_WEBHOOK_URL, {
        embeds: [embed],
        username: 'TÖH Bot',
        avatar_url: 'https://images.habbo.com/c_images/album1584/TUR44.gif'
      });
    } catch (error) {
      console.error('Discord Webhook Error:', error);
    }
  }
};

// Local Storage Auth Service
export const authAPI = {
  register(userData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    habboUsername: string;
  }) {
    const users = JSON.parse(localStorage.getItem('toh_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.username === userData.username || u.email === userData.email)) {
      throw new Error('Bu kullanıcı adı veya e-posta zaten kayıtlı!');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      password: btoa(userData.password), // Simple encoding
      joinDate: new Date().toISOString(),
      isActive: true,
      rank: 'Stajyer',
      badge: 'memurlar',
      workTime: 0,
      salary: 0,
      lastLogin: null
    };

    users.push(newUser);
    localStorage.setItem('toh_users', JSON.stringify(users));

    // Log to Discord
    discordAPI.sendLog({
      title: '🆕 Yeni Kayıt',
      description: `${userData.fullName} sisteme kayıt oldu!`,
      color: 0x00ff00,
      fields: [
        { name: 'Kullanıcı Adı', value: userData.username, inline: true },
        { name: 'Habbo Kullanıcı Adı', value: userData.habboUsername, inline: true },
        { name: 'E-posta', value: userData.email, inline: true }
      ]
    });

    return newUser;
  },

  async login(username: string, password: string) {
    const users = JSON.parse(localStorage.getItem('toh_users') || '[]');
    const user = users.find((u: any) => 
      (u.username === username || u.email === username) && 
      u.password === btoa(password)
    );

    if (!user) {
      throw new Error('Kullanıcı adı veya şifre hatalı!');
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    users[userIndex] = user;
    localStorage.setItem('toh_users', JSON.stringify(users));

    // Get Habbo profile data
    try {
      const habboProfile = await habboAPI.getUserProfile(user.habboUsername);
      user.habboData = habboProfile;
      user.motto = habboProfile.motto;
      user.avatar = `https://www.habbo.com.tr/habbo-imaging/avatarimage?user=${user.habboUsername}&direction=2&head_direction=3&size=l`;
    } catch (error) {
      console.warn('Habbo profil bilgileri alınamadı:', error);
    }

    // Log to Discord
    discordAPI.sendLog({
      title: '🔐 Giriş Yapıldı',
      description: `${user.fullName} sisteme giriş yaptı!`,
      color: 0x0099ff,
      username: user.username
    });

    return user;
  },

  getCurrentUser() {
    const currentUser = localStorage.getItem('toh_current_user');
    return currentUser ? JSON.parse(currentUser) : null;
  },

  setCurrentUser(user: any) {
    localStorage.setItem('toh_current_user', JSON.stringify(user));
  },

  logout() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      discordAPI.sendLog({
        title: '🚪 Çıkış Yapıldı',
        description: `${currentUser.fullName} sistemden çıkış yaptı!`,
        color: 0xff9900,
        username: currentUser.username
      });
    }
    localStorage.removeItem('toh_current_user');
  }
};