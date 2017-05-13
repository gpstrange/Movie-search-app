import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={term:'',data: [],year:''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onYear = this.onYear.bind(this);
  }

  onSubmit(){
    if(this.state.term = ''){
      console.log('empty term')
      alert("Enter something!")
    }
    else{
      var search = 'http://www.omdbapi.com/?apikey=9139c68f&s=' + this.state.term ;
      console.log('else executed')
      axios.get(search).then(res=>{
        console.log("res"+res)
        this.setState({data: res.data.Search})
      })
    }
  }

  onInputChange(event){
    this.setState({term:event.target.value});
    console.log(this.state.term)
  }

  onYear(event){
    this.setState({year:event.target.value})
  }

  onSubmit(event){
    event.preventDefault();
    console.log(this.state.term);
    if(this.state.term === ''){
      console.log('empty term')
      alert("Enter the movie name!")
    }
    else{
      var search = 'http://www.omdbapi.com/?apikey=9139c68f&s=' + this.state.term + '&y=' + this.state.year;
      axios.get(search).then(res=>{
        console.log(res.data);
        if(res.data.Response === "False"){
          alert("Enter a valid movie name")
        }
         else{
           console.log("else")
            this.setState({data: res.data.Search})
         }
      })
    }
    console.log(this.state.data)
  }
  render(){
    return(
      <div className="container" style={{paddingTop:30 , width:'70%'}} >
        <center><h1>Movie Search App</h1>
      <form className="input-group" style={{marginTop:20 }}>
        <input
          placeholder="Enter the movie name"
          className="form-control"
          style={{width:"40%"}}
          type="text"
          value={this.state.term}
          onChange={this.onInputChange}
          required />
        <span className="input-group">
        <input
          placeholder="Enter the Year (optional)"
          className="form-control"
          type="text"
          style={{marginLeft:10,width:"65%"}}
         value={this.state.year}
         onChange={this.onYear} />
        <button className="btn btn-primary" style={{marginLeft:10}} type="submit" onClick={this.onSubmit.bind(this)}>Search</button>
    </span>

</form>
  {this.state.data.length==0 ? null : <h3 style={{paddingTop:20}}>Search Results</h3>}
          {this.state.data.map(item=><ol><div className="container" style={{paddingTop:10}}>
            <div className="thumbnail" >
                {item.Poster =="N/A" ? <h4>Poster : Image not available </h4> :
                  <img src={item.Poster} style={{width:"30%"}} />}
                  <div className="caption">
                   <h4>Title : {item.Title}</h4>
                   <h4>Year : {item.Year}</h4>
                     <p><a href = {`https://torrentz2.eu/search?f= + ${item.Title}`} className="btn btn-primary">Download</a> </p>
                   <br ></br>
                  </div>
                </div>
              </div>
            </ol>)}
           </center>
          </div>
    )
  }
}
