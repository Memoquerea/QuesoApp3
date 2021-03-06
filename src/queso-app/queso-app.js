import { LitElement, html } from 'lit-element';
import './queso-header.js';
import './queso-main.js';
import './queso-sidebar.js';
import './queso-footer.js';


class QuesoApp extends LitElement {
	
	static get properties() {
		return {	
		};
	}

	
	constructor() {
		super();		
	}		

	
	render() {
		return html`
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
			<div>
				<queso-header class="text-center"></queso-header>
			</div>
			<div class="row mr-3"><!--El m para que no se rompan los gutters el tema-->
				<queso-sidebar class="col-2"></queso-sidebar>
				<queso-main @cheese-count=${this.cheeseCount} class="col-10"></queso-main>
			</div>			
			<div>
				<!--<queso-footer class=" w-100 text-secondary text-center"></queso-footer>-->
			</div>
	`;
  }

}

customElements.define('queso-app', QuesoApp)
