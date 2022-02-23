import { LitElement, html } from 'lit-element';
import sandbox from '../sandbox/sandbox';

class QuesoFicha extends LitElement {
	
	static get properties() {
		return {			
			cheese: {type: Object},
			newCheese: {type: Boolean}
		};
	}
	
	constructor() {

		super();
		this.newCheese = false;
		this.reset();
		
		sandbox.on('show-ficha',this.mostrarInfo.bind(this));
		sandbox.on('new-cheese',this.mostrarBlank.bind(this));
	}
	
  render() {
    return html`	
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<div class='border rounded border-secondary'>
			
			<div class="modal-header bg-dark text-white">
        			<h3>${this.dialogTitle()}</h3>
    			</div>
			
			<div class='border m-2 p-2'>
				<form>
					<div class="form-group">
						<label>Nombre</label>
						<input type="text" id="cheeseFormName"  class="form-control" placeholder="Nombre" .value="${this.cheese.name}" @input=${this.updateName}/>
					</div>
					<div class="form-group">
						<label>Descripci&oacute;n</label>
						<input type="text" class="form-control" placeholder="Descripcion" @input=${this.updateDescription} .value="${this.cheese.description}"></textarea>
					</div>
					<div class="form-group">
						<label>Meses maduraci&oacute;n</label>
						<input type="text" class="form-control" placeholder="Meses maduracion" .value="${this.cheese.age ? this.cheese.age : ""}" @input=${this.updateAge}/>			
						<label>Recomendado</label> 
						<input type="checkbox" @change="${this.updateRecommended}" .checked="${this.cheese.recommended}" class="form-control" placeholder="Recomendado" />
					</div>
			
				</form>
			</div>

	                <div class="modal-footer bg-dark">
  	                      <button type="submit" class="btn btn-primary" @click=${this.goBack} ><strong>Atras</strong></button>
                              <button type="submit" @click=${this.storeInfo} class="btn btn-success"><strong>Guardar</strong></button>
                        </div>
			
		</div>
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

  reset()
  {
      this.cheese ={
	"id":"",
	"name":"",
	"description":"",
	"image": {"src": "./img/Caerphilly_cheese.jpg"},
	"recommended": false
      
      };

  }


  mostrarInfo(e)
  {
	this.cheese = e.detail.cheese;
	this.show();
  }

  mostrarBlank(e)
  {
	this.newCheese=true;
	this.reset();
	this.show();
  }

  goBack(e) {

	  e.preventDefault();	  
  	  this.newCheese=false;	
	  this.reset(); 			 
          this.hide();
 	  sandbox.dispatch("show-list",{},this);
  }


  storeInfo(e)
  {
	e.preventDefault();
	sandbox.dispatch('cheese-store',{'cheese':this.cheese,'newCheese':this.newCheese},this);
	this.goBack(e);
  }

  dialogTitle()
  {
	return (this.newCheese)?"Nuevo Queso":"Queso Info";
  }


  //updates
  updateName(e) 
  {
        this.cheese.name = e.target.value;
  }

  updateDescription(e) 
  {
        this.cheese.description = e.target.value;
  }

  updateAge(e) 
  {
        this.cheese.age = e.target.value;
  }

  updateRecommended(e) 
  {
       this.cheese.recommended = e.target.checked;
  }
  
}

customElements.define('queso-ficha', QuesoFicha)
