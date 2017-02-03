import {Directive, Input, EventEmitter, Inject, ElementRef, Renderer, OnInit} from '@angular/core';

@Directive({
    selector: '[focus]'
})
export class FocusDirective implements OnInit {

    @Input('focus') focusEvent: EventEmitter<boolean>;

    constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {

    }

    ngOnInit(): void {
        this.focusEvent.subscribe(event => {
            this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
            this.renderer.invokeElementMethod(this.element.nativeElement, 'setSelectionRange', [0, this.element.nativeElement.value.length]);
        });
    }

}
