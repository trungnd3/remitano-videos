package request

type ShareVideo struct {
	Url						string `json:"url"`
}

type CreateVideo struct {
	Title					string	`validate:"required,min=1,max=255" json:"title"`
	Description		string	`validate:"required,min=1,max=500" json:"description"`
	ThumbnailURL	string	`validate:"required" json:"thumbnailUrl"`
	SourceURL			string	`validate:"required" json:"sourceUrl"`
	YoutubeId			string	`validate:"required" json:"youtubeId"`
	Likes					int			`json:"likes"`
	Dislikes			int			`json:"dislikes"`
	SharedBy			string	`json:"sharedBy"`
}

type UpdateVideo struct {
	Id						int			`validate:"required" json:"id"`
	Title					string	`validate:"required,min=1,max=255" json:"title"`
	Description		string	`validate:"required,min=1,max=500" json:"description"`
	ThumbnailURL	string	`validate:"required" json:"thumbnailUrl"`
	SourceURL			string	`validate:"required" json:"sourceUrl"`
	YoutubeId			string	`validate:"required" json:"youtubeId"`
	Likes					int			`json:"likes"`
	Dislikes			int			`json:"dislikes"`
	SharedBy			string	`json:"sharedBy"`
}