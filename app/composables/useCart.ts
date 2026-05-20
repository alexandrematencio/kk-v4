export type CartItem = {
  slug: string
  title: string
  price: number
  qty: number
  image?: string
}

export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])

  const total = computed(() =>
    items.value.reduce((s, i) => s + i.price * i.qty, 0)
  )

  const totalQty = computed(() =>
    items.value.reduce((s, i) => s + i.qty, 0)
  )

  function add(item: Omit<CartItem, 'qty'>) {
    const existing = items.value.find((i) => i.slug === item.slug)
    if (existing) existing.qty++
    else items.value.push({ ...item, qty: 1 })
  }

  function decrement(slug: string) {
    const it = items.value.find((i) => i.slug === slug)
    if (!it) return
    if (it.qty > 1) it.qty--
    else remove(slug)
  }

  function remove(slug: string) {
    items.value = items.value.filter((i) => i.slug !== slug)
  }

  function clear() {
    items.value = []
  }

  return { items, total, totalQty, add, decrement, remove, clear }
}
