import { Routes } from "@angular/router";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { TableListComponent } from "../../table-list/table-list.component";
import { MapsComponent } from "../../maps/maps.component";
import { VectorMapsComponent } from "app/vectormaps/vectormaps.component";


export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "vectormap", component: VectorMapsComponent },
  { path: "table-list", component: TableListComponent },
  { path: "maps", component: MapsComponent }
];
