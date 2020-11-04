# Squad Up!

## Description

Squad Up! is your space to meet new like-minded friends to play your favourite games with and to build new communities around your interests.
Join a squad gearing up to face your favourite challenges or build your own, join the discussion in the forums, or check in on the latest gaming news and esports updates.

Squad Up! is committed to creating a friendly and safe space for all gamers.

## User Stories

* homepage - a neat and descriptive home page
* sign up - a clear and streamlined sign up experience
* login
* logout
* profile page - well-organised and informative user profile pages showcasing a user's activity on the site
* edit profile
* squad search -  a robust search page for open squads
* squad details -  a compact but detailed page about the selected squad
* create squad -  a streamlined squad creation experience
* messaging - a simple solution to connecting with your squad and other users directly
* chat log -  a place where all your chats get stored and are easily available
* forums - a clean and organised overview of the forums with a search function
* forum post - a detailed view of the selected forum post with comments and likes
* create forum post - a simple experience to create and share a post on the forums
* 404
* 500


## Backlog

* newsfeed - games-related news articles home with search
* news article - article content with user comments
* esports - home of esports results with filter options
* esports threads - league/match/event details with comments
* public/semi-private/private squads - allow creator to set the privacy level of a squad


## Routes

### Frontend

* /
* /signup
* /signin
* /logout
* /profile/:id
* /profile/edit
* /messages
* /messages/:id
* /squads
* /squads/:id
* /forums
* /forums/:id
* /forums/create

**Backlog client routes**
* /news
* /news/:id
* /esports
* /esports/id


### Backend

* /POST /signup
* /POST /login
* /GET /profile/:id
* /PATCH /profile/:id/edit
* /GET /squads
* /GET /squads/:id
* /POST /squads
* /PATCH /squads/:id
* /DELETE /squads/:id
* /GET /forums
* /GET /forums/:id
* /POST /forums
* /PATCH /forums/:id
* /DELETE /forums/
* /POST /forums/:id/comment
* /DELETE /comment/:id
* /POST /logout

+ messaging routes, to be configured depending on package
+ external API routes, to be configured

**Backlog server routes**
* /GET /news
* /GET /news/:id
* /POST /news/:id/comment
* /GET /esports
* /GET /esports/:id
* /POST /esports/:id/comment

## Models

### User
  * username: string
  * email: string
  * password: string
  * platforms: string\[]
  * favouriteGames: string\[]
  * bio: string
  * image: string

### Squad
  * creator: ObjectId, ref: User
  * game: string
  * title: string
  * description: string
  * size: number
  * members ObjectId\[], ref: User
  * timestamps

### ForumPost
  * author: ObjectId, ref: User
  * title: string
  * content: string
  * imageContent: string\[]
  * (upvotes/likes)
  * timestamps

### Comment
  * author: ObjectId, ref: User
  * originalPost: ObjectId, ref: ForumPost 
  * content: string
  * timestamps
  
**Backlog**
*these may not need their own models, but integrate into forum posts*
* NewsPost
* EsportsPost


## Links

* [Trello](https://trello.com/b/Yk9BbjDe/squad-up)
* [Client Repository](https://github.com/LauraSalakari/squad-up-client)
* [Server Repository](https://github.com/LauraSalakari/squad-up-server)
* [Deployment Link](https://squad-u-p.herokuapp.com/)
