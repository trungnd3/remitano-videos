package response

type Video struct {
	Id						int			`json:"id"`
	Title					string	`json:"title"`
	Description		string	`json:"description"`
	ThumbnailURL	string	`json:"thumbnailUrl"`
	SourceURL			string	`json:"sourceUrl"`
	YoutubeId			string	`json:"youtubeId"`
	Likes					int			`json:"likes"`
	Dislikes			int			`json:"dislikes"`
	SharedBy			string	`json:"sharedBy"`
}