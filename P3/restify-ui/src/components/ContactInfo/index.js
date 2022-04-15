
function ContactInfo(props) {
    return <>
    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <div class="container" id="comments-tab">
            <br></br>
            <h4>Our Location</h4>
            <br></br>
            <div id="rest-addr">
                <span class="addr-part">Address:</span> {props.address}<br></br>
                <span class="addr-part">Postal Code:</span> {props.postal-code}<br></br>
                <span class="addr-part">Phone Number:</span> {props.phone-num}<br></br>
            </div><br></br>
            Feel free to leave a comment on the main page and we will get back to you!
        </div>
    </div>
    </>
}