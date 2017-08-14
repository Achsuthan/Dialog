import { Component } from '@angular/core';

import { NeedPage } from '../need/need';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NeedPage;

  constructor() {

  }
}
