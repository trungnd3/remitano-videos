package response

type Youtube struct {
	Title						string 	`json:"title"`
	AuthorName			string 	`json:"author_name"`
	AuthorUrl				string	`json:"author_url"`
	Type						string	`json:"type"`
	Height					int 		`json:"height"`
	Width						int			`json:"width"`
	Version					string 	`json:"version"`
	ProviderName		string 	`json:"provider_name"`
	ProviderUrl			string 	`json:"provider_url"`
	ThumbnailHeight	int			`json:"thumbnail_height"`
	ThumbnailWidth 	int			`json:"thumbnail_width"`
	ThumbnailUrl 		string	`json:"thumbnail_url"`
	Html 						string	`json:"html"`
}