export interface UserInfo {
  id: number | null;
  userName: string;
  permissions: string[];
  avatar: string;
}

export interface MenuItem {
  name: string;
  title: string;
  components: string;
  meta?: Record<string, any>;
  children?: MenuItem[];
}

export interface UserState {
  userInfo: UserInfo;
  menus: MenuItem[];
}
