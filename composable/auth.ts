import { useUserStore, type User } from "@/stores/userStores";

export const onlyAdmin = () => {
  const userStore = useUserStore();

  if (userStore.user.type !== 'admin') {
    navigateTo('/login');
  }
}

export const onlyEmployee = () => {
  const userStore = useUserStore();

  if (userStore.user.type !== 'employee') {
    navigateTo('/login');
  }
}

export const onlyUser = () => {
  const userStore = useUserStore();

  if (userStore.user.type !== 'user') {
    navigateTo('/login');
  }
}


export const redirectUser = (token: string, user: User) => {
  const router = useRouter();

  if (token) {
    if (user.type === "admin") {
      router.replace({ path: "admin/appointment" });
      return;
    }

    if (user.type === "employee") {
      router.replace({ path: "employee/appointment" });
      return;
    }

    router.replace({ path: "user/appointment" });
  }
};

export const makeLoginSuccesful = (data: any) => {
  const userStore = useUserStore();

  userStore.setToken(data.value.token);
  userStore.setUser({
    _id: data.value.user._id,
    picture: data.value.user.picture,
    email: data.value.user.email,
    name: data.value.user.name,
    type: data.value.user.type,
  });
  redirectUser(data.value.token, data.value.user);
}