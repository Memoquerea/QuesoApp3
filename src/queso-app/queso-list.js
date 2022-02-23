import { LitElement, html,css } from 'lit-element';
import './queso-item.js';
import $ from '../ajax/ajax';
import sandbox from '../sandbox/sandbox';
import '../dialog/dialog-app.js';

class QuesoList extends LitElement {

	static get properties() {
                return {
                        src:{type:String},
                        cheeses:{type:Array}
                };
        }

	
	static get styles()
	{
		return css `main{margin-top:60px; margin-bottom:70px;}`;
	}

	
	constructor() {
		super();
		this.src="";
		this.cheeses = [];
		
		sandbox.on('new-cheese',this.hide.bind(this));
		sandbox.on('show-list',this.show.bind(this));
		sandbox.on('cheese-store',this.save.bind(this));
	}

	//src property 
	connectedCallback()
	{
		super.connectedCallback();
		this.getCheeses();
	}

	render() {

    		return html `
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <main>
                        <div class="row" id="cheeseCatalog">
                                <div class="row row-cols-1 row-cols-md-4 mb-3">

                                ${this.cheeses.map(function(cheese){
                                   
                                        return html `
                                                <queso-item
								id="${cheese.id}"
                                                                name="${cheese.name}"
                                                                .image="${cheese.image}"
                                                                recommended="${cheese.recommended}"

                                                                @delete-cheese=${this.deleteCheeseConfirm}
                                                                @info-cheese=${this.infoCheese}
                                                >
                                                </queso-item>`;
                                }.bind(this))}

                                </div>
                        </div>

                        <div class="row justify-content-center">

			<dialog-app class='d-none'
			@dialog-confirm="${this.deleteCheese.bind(this)}"
			@dialog-cancel="${function(e){e.target.close()}}"
			id="confirm" 
			></dialog-app>

                        </div>
                </main>		

		`;
  	}


  show()
  {
        this.classList.remove("d-none");
  }   

  hide()
  { 
        this.classList.add("d-none");
  }

	
  ///////////////////////////////////////////////////////////////////

  	getCheeses()
  	{
		$.ajax('GET',this.src,function(response)
		{
			this.cheeses=response;
			console.log(this.cheeses);

		}.bind(this));
   	}

  	postCheese(e)
  	{
		delete e.detail.cheese.id;

                $.ajax('POST',this.src,function(response)
                {
                        this.getCheeses();

                }.bind(this), e.detail.cheese);
  	}

  	deleteCheese(id)
  	{ 	
	        $.ajax('DELETE',this.src+"/"+id,function(response)
                {
                        this.getCheeses();

                }.bind(this));
  	}

	putCheese(e)
	{

		$.ajax('PUT',this.src+"/"+e.detail.cheese.id,function(response)
                {
			this.getCheeses();

                }.bind(this), e.detail.cheese);
	}
	
	////////////////////////////////////////////////////////////////////	
	
	save(e)
	{
		if(e.detail.newCheese)
			this.postCheese(e);
		else 
			this.putCheese(e);
	}

	deleteCheeseConfirm(e)
	{
		let dialog = this.shadowRoot.getElementById('confirm');
		dialog.body = html `Desea eliminar el queso ${e.detail.name} ?`;
		dialog.confirm = function()
		{
			this.deleteCheese(e.detail.id);
			dialog.close();
			
			
		}.bind(this);
		
		dialog.show();
		
	}

  	infoCheese(e) 
  	{
		let cheese= this.cheeses.find(function(el){ return el.id==e.detail.id});
		sandbox.dispatch('show-ficha',{"cheese":cheese},this);
		this.hide();
  	}

	updated()
	{
		sandbox.dispatch('cheese-count',{'count':this.cheeses.length},this);
	}

}

customElements.define('queso-list', QuesoList);
