
import React from 'react';
import "./style.css";
import API from "../API";

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
          value: ''
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
        var fetch_url = API + "/restaurants/" + restaurant_id + '/add-comment/';
        var response_fields;
        fetch(fetch_url, {
            method: 'POST',
            body: JSON.stringify({
              'text': this.state.value // the comment that the user entered
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {response_fields = data;}) // retrieve response body

        var new_comment = <Comment text={response_fields.text} name={response_fields.user} />;
        // TODO: render new_comment in comments section

      }

      render() {
        return (<>
            <div className="all-comments">
            </div>
                <h4>Got a comment?</h4>
            <form onSubmit={this.handleSubmit}>
                <textarea id="comment-box" name="comment-box" rows="4" cols="50" value={this.state.value}
                onChange={this.handleChange} placeholder="Enter comment here..."></textarea><br></br>
                <input id="add-comment-button" type="submit" value="Add comment"></input>
            </form>
            </>
        );
      }
}
export default CommentForm

// <Comment text=response['text'] name=response['user'] avatar?>
// post request to add comment gives {"user": author_id, "restaurant": restaurant_id, "text": comment_text}
// so need to make post request first, then pass the data from that response to Comment (as the props)
// so when add comment button gets clicked, make the post request, then call Comment with post request response data
// add-comment-button ^^

/*
<ContactInfo address="123 Foood street" postalcode="111 ABC" phonenum="416-111-222"/>
        <EditRestaurant />
        <Comment />
 */