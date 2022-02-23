import { LitElement, html, css } from 'lit-element';  
import sandbox from '../sandbox/sandbox';

class dialogApp extends LitElement {    
	
	static get properties() {
                return {
			
                        title: {type: String},
                        btnCancel: {type: String},
                        btnconfirm: {type: String},
			body: {type: Object}
                };
        }

 	static get styles()
   	{
        	return css `:host{
                	position: absolute;
	                top: 300px;
        	        left: 50%;
                	width:50%;
	                transform: translate(-50%, -50%);
			z-index:10000;
        	        }`;
   	}

        constructor() {
                // Always calls super() first.
                super();
                this.title='';
		this.btnConfirm='Confirmar';
		this.btnCancel='Cancelar';
		//this.classList.add("position-absolute");
		//this.classList.add("start-50");
		
        }
	
	// Properties code up here	   
	render() {
			
	return html`

		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                <div class='border rounded border-secondary bg-light'>

                        <div class="modal-header bg-dark text-white">
                                <h3>${this.title}</h3>
                        </div>

                        <div class='border m-2 p-2'>
                                <form>
                                        <div class="form-group">
                                                <label>${this.body}</label>
                                        </div>

                                </form>
                        </div>

                        <div class="modal-footer bg-dark">
                              <button type="submit" class="btn btn-primary" @click=${this.cancel} ><strong>${this.btnCancel}</strong></button>
                              <button type="submit" @click=${this.confirm} class="btn btn-success"><strong>${this.btnConfirm}</strong></button>
                        </div>

                </div>

		`;
	}

	show()
	{
		 this.classList.remove("d-none");		
		 sandbox.dispatch('dialog-show',{},this);
	}

	close()
	{
		 this.classList.add("d-none");
		 sandbox.dispatch('dialog-close',{},this);
	}

	cancel(e){sandbox.dispatch('dialog-cancel',{},this);}
	confirm(e){sandbox.dispatch('dialog-confirm',{},this);}

}

customElements.define('dialog-app', dialogApp);
