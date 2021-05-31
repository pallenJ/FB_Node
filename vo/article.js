'use strict';


export default ({_uid , _title , _content })=>{

    return {
        uid:_uid,
        title:_title,
        content:_content,
        timestamp: Date.now()
    };

};