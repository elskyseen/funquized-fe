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

export type {
  ILogin,
  IRegister,
  ITokenSlice,
  ICategorie,
  IUserSlice,
  IChapter,
  IChallenge,
};
