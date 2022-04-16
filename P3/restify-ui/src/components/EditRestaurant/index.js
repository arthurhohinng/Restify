import React from "react";

const EditRestaurant = () => {

    return(
            <div id="edit" role="tabpanel"
                 aria-labelledby="edit-tab">
                <br/>
                <div>
                    <a className="btn btn-secondary"
                       href="../../../../../P1/form-pages/edit-restaurant.html">Edit
                        Name/Description</a>
                    <br/>
                        <br/>
                            <a className="btn btn-secondary"
                               href="../../../../../P1/form-pages/edit-menu.html">Edit menu</a>
                </div>
                <br/>
                    <form>
                        <input type="button" className="btn btn-secondary"
                               value="Add new picture"/>
                    </form>
                        <form>
                            <input type="button" className="btn btn-secondary"
                                   value="Remove picture"/>
                        </form>
                            <a className="btn btn-secondary"
                               href="../../../../../P1/form-pages/add-blog.html">Add blog post</a>
                            <br/>
                                <br/>
                                    <form>
                                        <input type="button"
                                               className="btn btn-secondary"
                                               value="Remove blog post"/>
                                    </form>
            </div>
    )
}
export default EditRestaurant;