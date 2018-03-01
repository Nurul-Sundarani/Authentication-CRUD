import React, { Component } from 'react';

class ProductItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEdit : false
        }

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }
    
    onDelete(){
        const { name , onDelete } = this.props;

        //Method in App.js
        onDelete(name);
    }

    onEdit(){
        this.setState({ isEdit : true});
    }

    onEditSubmit(event){
        event.preventDefault();
        
        //Name of Edit field which is clicked.
        this.props.onEditSubmit(this.nameInput.value , this.priceInput.value , this.props.name );

        this.setState({isEdit : false});
    }
    
  render() {
    const { name, price } = this.props;
    
    return (
        <div >
            {
                this.state.isEdit
                ? (
                    <div>
                    <form onSubmit = {this.onEditSubmit}>
                    <input placeholder="name" ref = {nameInput => 
                        this.nameInput = nameInput}
                        defaultValue = {name}
                        />
                        <input placeholder="Price" ref = {priceInput => this.priceInput = priceInput }
                        defaultValue = {price}
                        />    
                        <button>Save</button>    
                        </form>    
                     </div>   
                )
                : (
                    <div>
                    <span>{name}</span> 
                    {` | `} 
                    <span>{price}</span>
                    {` | `} 
                    <button onClick={this.onEdit}>Edit</button>
                    {` | `} 
                    <button onClick={this.onDelete}>Delete</button>
                    </div>
                )
            }

      </div>
    );
  }
}

export default ProductItem;
