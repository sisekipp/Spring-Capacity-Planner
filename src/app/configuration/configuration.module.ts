import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {configurationRoutes} from './configuration-routing.module';
import {ConfigurationComponent} from './components/configuration/configuration.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(configurationRoutes)
  ]
})
export class ConfigurationModule { }
