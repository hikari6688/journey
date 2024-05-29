import { defineStore } from "pinia";
import { UserState } from "./type";
const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      userInfo: {
        id: null,
        userName: "",
        avatar: "",
        permissions: [],
      },
      menus: [
        {
          name: "systemManage",
          title: "系统管理",
          components: "systemManage",
          meta: {},
          children: [
            {
              name: "userManage",
              title: "用户管理",
              components: "userManage",
            },
            {
              name: "employeeManage",
              title: "员工管理",
              components: "employeeManage",
            },
            {
              name: "dictManage",
              title: "字典管理",
              components: "dictManage",
              meta: {},
              children: [
                {
                  name: "bizDictManage",
                  title: "业务字典",
                  components: "bizDictManage",
                },
                {
                  name: "sysDictManage",
                  title: "系统字典",
                  components: "sysDictManage",
                },
              ],
            },
          ],
        },
      ],
    };
  },
  actions: {
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    setMenus(menus: UserState["menus"]) {
      this.menus = menus;
    },
  },
});
export default useUserStore;
