import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconRendererComponent } from '../renderercomponent/icon-renderer-component';
import { ButtonRendererComponent } from '../renderercomponent/button-renderer-component';
import { LinkRendererComponent } from '../renderercomponent/link-renderer-component';



@NgModule({
  declarations: [ IconRendererComponent,ButtonRendererComponent,LinkRendererComponent ],
  imports: [
    CommonModule,
  ]
})
export class AgrenderercomponentModule { }
