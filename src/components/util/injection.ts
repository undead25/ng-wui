import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
  Injectable,
  Injector,
  EmbeddedViewRef,
  Type
} from '@angular/core';

/**
 * 动态插入组件、模板到一个已知的位置
 * @export
 * @class InjectionService
 */
@Injectable()
export class InjectionService {
  private componentRef: ComponentRef<any>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  /**
   * 找到根组件以便插入新的组件
   * @returns {ComponentRef<any>}
   */
  public getRootComponent(): ComponentRef<any> {
    if (this.componentRef) return this.componentRef;
    const rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents.length) return rootComponents[0];

    throw new Error('找不到根组件');
  }

  /**
   * 设置根组件
   * @param {ComponentRef<any>} component
   */
  public setRootComponent(component: ComponentRef<any>): void {
    this.componentRef = component;
  }

  /**
   * 找到组件的DOM节点
   * @param {ComponentRef<any>} componentRef
   * @returns {HTMLElement}
   */
  public getComponentNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * 找到根组件的DOM节点
   * @returns {HTMLElement}
   */
  public getRootComponentNode(): HTMLElement {
    return this.getComponentNode(this.getRootComponent());
  }

  /**
   * 组件传参
   * @param {ComponentRef<any>} componentRef
   * @param {*} options
   * @returns {ComponentRef<any>}
   */
  setComponentOpts(componentRef: ComponentRef<any>, options: any): ComponentRef<any> {
    if (options) {
      const props = Object.getOwnPropertyNames(options);
      for (const prop of props) {
        componentRef.instance[prop] = options[prop];
      }
    }
    return componentRef;
  }

  /**
   * 在相邻的位置插入一个组件 （动态组件）
   * @template T
   * @param {Type<T>} componentClass
   * @param {*} [options={}]
   * @param {Element} [location=this.getRootComponentNode()]
   * @returns {ComponentRef<any>}
   */
  public appendComponent<T>(
    componentClass: Type<T>,
    options: any = {},
    location: Element = this.getRootComponentNode()): ComponentRef<any> {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let componentRef = componentFactory.create(this.injector);
    let appRef: any = this.applicationRef;
    let componentNode = this.getComponentNode(componentRef);

    this.setComponentOpts(componentRef, options);

    if (appRef['attachView']) {
      appRef.attachView(componentRef.hostView);

      componentRef.onDestroy(() => {
        appRef.detachView(componentRef.hostView);
      });
    }
    location.appendChild(componentNode);
    return componentRef;
  }

  public dispose() {
    if(this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
