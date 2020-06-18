import React from 'react';
import {connect} from 'react-redux';
import {editStream, fetchStream}  from '../../actions';

class StreamEdit extends React.Component {
    //We want to make sure every component works in isolation. So clicking on the Edit button on a stream 
    // when the streams have already been fetched will work without calling fetchStream but incase we 
    // directly end up at this component by routing to /stream/edit/id, then we need to make sure we fetch 
    // that stream before displaying and editing it.
    componentDidMount () {
        console.log(this.props)
        this.props.fetchStream(this.props.match.params.id)
    }
    render () {
        return (
            <div>Edit Stream</div>
            );
    }
}

// We want to do url based navigation everytime a user clicks on the edit button. We want to extract the id 
// of the stream to be edited and pass it down to the route in the App.js. From there, that id will be passed 
// to the StreamEdit component as a prop. Also note that the mapStateToProps function has access to ownProps which
// is the same props passed to the StreamEdit component. 
// The id is stored in the match.params of the props object. 
const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}
export default connect( 
    mapStateToProps, 
    {editStream, fetchStream}
    )(StreamEdit);