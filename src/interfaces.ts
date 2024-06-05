interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  username: string;
  confirmPassword: string;
}

interface ICategorie {
  id: string;
  category_name: string;
  url_image: string;
  image: string;
  challenges: Array<{ point: number }>;
}

interface ITokenSlice {
  token: string;
}

interface IUserSlice {
  email: string;
  username: string;
  photo: string;
  point: number;
}

interface IChapter {
  level: number;
  point: number;
}

interface IChallenge {
  challenge_image?: string;
  question: string;
  choices: string[];
}

interface INavbar {
  image: string;
  username: string;
  point: number;
}

interface IButton {
  icon?: string;
  isPrimary?: boolean;
  text: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

export type {
  ILogin,
  IRegister,
  ITokenSlice,
  ICategorie,
  IUserSlice,
  IChapter,
  IChallenge,
  INavbar,
  IButton,
};
