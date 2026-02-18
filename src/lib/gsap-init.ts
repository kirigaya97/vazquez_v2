import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/observer";
gsap.registerPlugin(ScrollTrigger, Observer);
export { gsap, ScrollTrigger, Observer };
