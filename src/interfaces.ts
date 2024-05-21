interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ICategorie {
  id: string;
  category_name: string;
  url_image: string;
  image: string;
}

interface ITokenSlice {
  token: string;
}

export type { ILogin, IRegister, ITokenSlice, ICategorie };
