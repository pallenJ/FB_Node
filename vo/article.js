'use strict';


module.exports = (val)=>{

    return {
        bno:val.bno||'',
        title:val.title||'',
        content:val.content || '',
        added : val.added || Date.now(),
        edited: Date.now()
    };

};