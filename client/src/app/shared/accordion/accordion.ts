export function accordionToggle(event: Event) {
    console.log(event);
    let button: any = event.target;
    button.classList.toggle("active");
    var panel = button.nextElementSibling;
    var jPanel: any = $(panel)
    jPanel.slideToggle();
}