export type MarkerColor = 'RED' | 'BLUE' | 'YELLOW' | 'GREEN' | 'PURPLE';

export type Category = {
  [key in MarkerColor]: string;
};

export interface Profile {
  id: number;
  email: string;
  nickname: string;
  imageUrl: string;
  kakaoImageUrl: string;
  loginType: 'email' | 'kakao' | 'apple';
}
