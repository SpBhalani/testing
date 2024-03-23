
export interface blogDataType {
    _id:string;
    title: string;
    blogDetails: string;
    img: string;
    date: string;
    author: string;
    commentsArray: [];
    authorEmail: string;
    comment: number;
    categoryId: string;
    tags: string[]
    description: string
  }
  export interface CategoryType {
    _id:string;
    categoryName: string;
    categoryLanguage: "English" | "Hindi";
  }