import React from 'react';

const ArticleComponent = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.preface}</p>
            {
                props.video != undefined ? <iframe
                width="560"
                height="315"
                src={props.video}
                frameBorder="0"
                allowFullScreen
            ></iframe> : ''
            }
            
            {props.content.map((c) => {
                return (
                    <>
                        <h2>{c.header}</h2>
                        <p>{c.body}</p>
                    </>
                );
            })}
        </div>
    );
}

export default ArticleComponent;
