import React, { Component } from 'react';
import "./Meme.css";
class Meme extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            topText: "",
            bottomText: "",
            allMemeImgs: [],
            randomImg: 'http://i.imgflip.com/1bij.jpg',

        }
        this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);


    }


    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(resp => resp.json())
            .then(content =>
                this.setState({
                    allMemeImgs: content.data.memes
                })

            )

    }

   handleChange(event)  {
        console.log("!chnaged")
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

   
        handleSubmit(event) {
       event.preventDefault();
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
        const randMemeImg = this.state.allMemeImgs[randNum].url;
        this.setState({ randomImg: randMemeImg });
    

        }

    render() {

        return(
        <div>
             <form className="meme-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={this.state.topText}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={this.state.bottomText}
          onChange={this.handleChange}
        />
        <button>Gen</button>
      </form>

          <div className='meme'>

                    <img src={this.state.randomImg} alt='' />
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div> 
        </div>
        )
    }
}

export default Meme;