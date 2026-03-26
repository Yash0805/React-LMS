declare namespace Master {
  interface CategoryForm {
    categoryName: string;
  }
  interface Category extends CategoryForm {
    categoryId: number;
  }

  interface MemberForm {
    memberName: string;
    memberType: string;
  }
  interface Member extends MemberForm {
    memberId: number;
  }
  interface BookForm {
    bookName: string;
    publisher: string;
    author: string;
    price: number;
    categoryId?: number;
    categoryName?: string;
  }

  interface Book extends BookForm {
    bookId: number;
  }

  interface BookIssueForm {
    memberId: number;
    bookId: number;
    issueDate?: string;
    returnDate?: string;
    renewCount?: number;
    renewDate?: number;
    status?: string;
    memberName?: string;
    memberType?: string;
    bookName?: string;
  }
  interface BookIssue extends BookIssueForm {
    issueId: number;
  }
}
