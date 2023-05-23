type BookNode = Extract<
  Queries.getBooksQuery["allContentfulBooks"]["nodes"][number],
  object
>;

export interface IBook
  extends Pick<BookNode, "id" | "author" | "title" | "rating" | "coverImage"> {}
