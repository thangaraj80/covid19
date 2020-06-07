import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CoronaApiService } from 'app/corona-api.service';
declare const jQuery: any;


@Component({
    selector: 'vector-maps-cmp',
    templateUrl: './vectormaps.component.html',
    styleUrls: ["./vectorsmaps.component.css"]
})

export class VectorMapsComponent implements OnInit, AfterViewInit {

    countriesConfirmedCases: { [code: string]: number } = {};

    constructor(public coronaNews: CoronaApiService) { }
    ngOnInit() {
        this.getAllCountries()
    }
    ngAfterViewInit() {


    }
    getAllCountries() {
        this.coronaNews.coronaAllCountries().subscribe(
            results => {
                results.forEach(c => {
                    this.countriesConfirmedCases[c.countryInfo.iso2] = c.cases
                });
            },
            err => {
                console.error('Observer got an error: ' + err
                )
            },
            () => {
                jQuery('#world-map').vectorMap(
                    {
                        map: 'world_mill',

                        backgroundColor: '#a5bfdd',
                        borderColor: '#818181',
                        borderOpacity: 0.25,
                        borderWidth: 1,
                        color: '#f4f3f0',
                        enableZoom: true,
                        hoverColor: '#c9dfaf',
                        hoverOpacity: null,
                        normalizeFunction: 'linear',
                        scaleColors: ['#ffb6cc', '#8f0011'],
                        selectedColor: '#c9dfaf',
                        selectedRegions: null,
                        showTooltip: true,
                        series: {
                            regions: [{

                                values: this.countriesConfirmedCases,
                                scale: ['#ffb6cc', '#8f0011'],
                                normalizeFunction: 'polynomial'
                            }]
                        },
                        onRegionTipShow: function (e, el, code) {
                            el.html(el.html() + ' (Cases - ' + this.countriesConfirmedCases[code] + ')');
                        }.bind(this),
                        // onRegionTipShow: function (e, el, code) {
                        //     el.html(el.html() + ' (GDP - ' + this.countriesConfirmedCases[code] + ')');
                        // }


                    }
                );

            }
        )

    }
}