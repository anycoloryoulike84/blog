
export class Post{

	constructor(

		public id?: string,
		public title?: string,
		public body?: string,
		public author?: string,
		public categoryId?: string,
		public comments?: Comment[],

		){
		
	}

}