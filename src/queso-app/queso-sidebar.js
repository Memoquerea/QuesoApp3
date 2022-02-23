import { LitElement, html } from 'lit-element';
import sandbox from '../sandbox/sandbox';

class QuesoSidebar extends LitElement {
	
	constructor() {
		super();		
	}
	
  render() {
    return html`	
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<aside>
			<section class='pt-3'>
				<div class="mt-5">
					<button class="w-100 btn bg-success" style="font-size: 50px" @click="${this.newCheese}"><strong>+</strong></button>								
				<div>				
			</section>
		</aside>
		
	`;
  }
  
  newCheese() {

	  sandbox.dispatch("new-cheese",{},this); 
  }
}

customElements.define('queso-sidebar', QuesoSidebar)
