import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];
  @Input() rowCount = 2;
  @Output() addToCart = new EventEmitter<Product>();

  currentIndex = signal<number>(0);
  visibleCount = signal<number>(3);
  itemsPerRow = computed(() => this.visibleCount());
  totalVisible = computed(() => this.itemsPerRow() * this.rowCount);
  
  totalPages = computed(() => {
    const n = this.products.length || 0;
    const perPage = this.totalVisible();
    return perPage > 0 ? Math.ceil(n / perPage) : 0;
  });

  currentPage = computed(() => {
    const perPage = this.totalVisible();
    return perPage > 0 ? Math.floor(this.currentIndex() / perPage) : 0;
  });

  getPages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }
  
  visibleProducts = computed(() => {
    const items = this.products || [];
    const n = items.length;
    if (n === 0) return [] as Product[];
    const len = Math.min(this.totalVisible(), n);
    const res: Product[] = [];
    for (let i = 0; i < len; i++) {
      res.push(items[(this.currentIndex() + i) % n]);
    }
    return res;
  });

  getRowProducts(rowIndex: number): Product[] {
    const visible = this.visibleProducts();
    const perRow = this.itemsPerRow();
    const start = rowIndex * perRow;
    const end = start + perRow;
    return visible.slice(start, end);
  }

  getRows(): number[] {
    return Array.from({ length: this.rowCount }, (_, i) => i);
  }

  private _onResize = () => this.updateVisibleCount();
  private _dragActive = false;
  private _dragStartX = 0;
  private _dragThreshold = 80;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.updateVisibleCount();
      window.addEventListener('resize', this._onResize);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._onResize);
    }
  }

  updateVisibleCount() {
    if (typeof window === 'undefined') return;
    const w = window.innerWidth;
    const count = w >= 1100 ? 3 : (w >= 760 ? 2 : 1);
    this.visibleCount.set(count);
    const n = this.products.length || 0;
    if (n > 0) this.currentIndex.set(((this.currentIndex() % n) + n) % n);
    else this.currentIndex.set(0);
  }

  onDragStart(ev: PointerEvent) {
    const viewport = ev.currentTarget as HTMLElement;
    if (!viewport) return;
    const origTarget = ev.target as HTMLElement | null;
    if (origTarget && origTarget.closest && origTarget.closest('button,a,input,textarea,select,[role="button"]')) return;
    this._dragActive = true;
    this._dragStartX = ev.clientX;
    try { viewport.setPointerCapture(ev.pointerId); } catch (e) { }
  }

  onDragMove(ev: PointerEvent) {
    if (!this._dragActive) return;
    const dx = ev.clientX - this._dragStartX;
    const viewport = ev.currentTarget as HTMLElement;
    const track = viewport.querySelector('.carousel-track') as HTMLElement | null;
    if (track) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${dx}px)`;
    }
    if (dx <= -this._dragThreshold) {
      this.next();
      this._dragStartX = ev.clientX;
    } else if (dx >= this._dragThreshold) {
      this.prev();
      this._dragStartX = ev.clientX;
    }
  }

  onDragEnd(ev: PointerEvent) {
    if (!this._dragActive) return;
    this._dragActive = false;
    const viewport = ev.currentTarget as HTMLElement;
    const track = viewport.querySelector('.carousel-track') as HTMLElement | null;
    if (track) {
      track.style.transition = '';
      track.style.transform = '';
    }
    try { viewport.releasePointerCapture(ev.pointerId); } catch (e) { }
  }

  onAdd(product: Product) {
    this.addToCart.emit(product);
  }

  next() {
    const n = this.products.length || 0;
    if (n === 0) return;

    this.currentIndex.set((this.currentIndex() + this.totalVisible()) % n);
  }

  prev() {
    const n = this.products.length || 0;
    if (n === 0) return;
    const idx = (this.currentIndex() - this.totalVisible()) % n;
    this.currentIndex.set((idx + n) % n);
  }

  selectPage(pageIndex: number) {
    const n = this.products.length || 0;
    if (n === 0) return;
    const newIndex = pageIndex * this.totalVisible();
    this.currentIndex.set(newIndex % n);
  }

  selectIndex(absIndex: number) {
    const n = this.products.length || 0;
    if (n === 0) return;
    this.currentIndex.set(((absIndex % n) + n) % n);
  }
}
