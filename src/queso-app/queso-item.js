import { LitElement, html,css} from 'lit-element';  
import sandbox from '../sandbox/sandbox';

export class QuesoItem  extends LitElement {    
	
	static get properties() {
                return {
			
			id:{type:Number},
			name:{type: String},
			image:{type:String},
			recomended: {type: Boolean}			
                };
        }


        static get styles()
        {
                return css `
                        .card {display:inline-block;}
                `;
        }



        constructor() {
                // Always calls super() first.
                super();
        }
	
	// Properties code up here	   
	render() {
			
	return html`
         	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">		
		<div class="card" style="width: 18rem;">
  		<img class="card-img-top" src="${this.image.src}" alt="${this.name}">
  		<div class="card-body">
    		<h5 class="card-title">${this.name}</h5>
    		<p class="card-text"></p>
    		<a href="#" class="btn btn-primary" @click=${this.deleteCheese}>Borrar</a>
		<a href="#" class="btn btn-primary" @click=${this.infoCheese}>Info</a>
  		</div>
		</div>
		`;
	}

	
        deleteCheese()
        {
                sandbox.dispatch('delete-cheese',{'id':this.id,'name':this.name},this);
        }


	infoCheese()
	{
		sandbox.dispatch('info-cheese',{'id':this.id},this);
	}

}

customElements.define('queso-item', QuesoItem);
