import React from 'react';

// so when a new comment is created, we use the below Comment arrow function to create its element
const Comment = (props) => {
    return(
		<div class="comment">
			<p>{props.name}</p>
		
		{props.text}
		</div>)
}

// need const Comments for list of all comments???


class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 'Enter comment here...' // basically the placeholder of the comment
        }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) { // when the value in the textarea changes, we must always update the state for it
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        // this.state.value is the text for the comment that the user entered
        // send post request to django url with payload this.state.value
        // then get response data and put it into a Comment, and then render Comment on the html page
        // get restaurant id from url
        var url = window.location.href;
        var restaurant_id = url.split("/")[4];
        var fetch_url = 'http://localhost:8000/restaurants/' + restaurant_id + 'add-comment/';
        var response_fields;
        /*
        const form_data = new FormData(event.target);
        var comment_text = form_data.get('comment-box'); // comment that the user entered
        */
        fetch(fetch_url, {
            method: 'POST',
            body: JSON.stringify({
              'text': this.state.value // the comment that the user entered
            }),
            headers: {
                'X-Api-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {response_fields = data;}) // retrieve response body

        var new_comment = <Comment text={response_fields['text']} name={response_fields['user']} />;

        // TODO: render new_comment in comments section

      }
    
      render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea id="comment-box" name="comment-box" rows="4" cols="50" value={this.state.value} 
                onChange={this.handleChange}>Enter comment here...</textarea><br></br>
                <input id="add-comment-button" type="submit" value="Add comment"></input>
            </form>
        );
      }
}
export default CommentForm;

// <Comment text=response['text'] name=response['user'] avatar?>
// post request to add comment gives {"user": author_id, "restaurant": restaurant_id, "text": comment_text}
// so need to make post request first, then pass the data from that response to Comment (as the props)
// so when add comment button gets clicked, make the post request, then call Comment with post request response data
// add-comment-button ^^

/*
class Comment extends React.Component {
    render(){
        const {author, update, restaurant, text} = this.props
    }
    useEffect(() => {
        const response = fetch("<int:restaurant_id>/add-comment/", {
            method: 'POST',
            body: JSON.stringify({
                // this.state.whatever_state_name
                // Comment model attributes
            }),
            headers: {
                'X-Api-Key': API_KEY,
                    'Content-Type': 'application/json'
            }
        });
    }, [])
}
export default Comment;

import React from 'react';

class Input extends React.Component {
    render(){
        const {title, update, value} = this.props
        return <>
            <span>{title}</span>
            <input type="text"
                   value={value}
                   onChange={event => update(event.target.value)}
                   style={{width: 200, height: 40, fontSize: '2em'}}
            />
        </>
    }
}

export default Input;
*/