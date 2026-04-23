---
title: Reuse Is Not Always the Right Abstraction
categories:
  - Others
---

## Introduction

When two pieces of code look similar, the natural instinct is to extract the shared part.
That instinct is useful, but it is not always correct.

The real question is not whether two implementations can share code. The real question is whether they should.

## A Simple Example

Imagine we need two product cards:

- a regular product card
- a featured product card

They overlap in a few places, but they are not the same UI. The featured card has a tag, a different background, and an extra button. It already serves a different purpose.

### Reusable Approach I

```jsx
function ProductCard({ isFeatured, price, image, url }) {
  return (
    <div style={isFeatured ? styles.featuredCard : undefined}>
      {isFeatured && <Tag />}
      <span>{price}</span>
      {isFeatured && <Button />}
      <img src={image} onClick={() => navigateTo(url)} />
    </div>
  );
}
```

This technically reuses code, but it does so by mixing two different ideas into one component. Every difference becomes a condition. The component may look compact, yet it is harder to read and easier to break as the two variants drift apart.

### Reusable Approach II

```jsx
function RegularProductCard({ price, image, url }) {
  return (
    <div>
      <Price price={price} />
      <ProductImage image={image} url={url} />
    </div>
  );
}

function FeaturedProductCard({ price, image, url }) {
  return (
    <div style={styles.featuredCard}>
      <Tag />
      <Price price={price} />
      <Button />
      <ProductImage image={image} url={url} />
    </div>
  );
}

function Price({ price }) {
  return <span>{price}</span>;
}

function ProductImage({ image, url }) {
  return <img src={image} onClick={() => navigateTo(url)} />;
}
```

This version is much cleaner. The shared pieces are extracted, and each card is easier to follow.

But there is still a deeper problem: why are these two UIs coupled at all?

The regular card and the featured card are different product requirements. They only happen to share some markup today. If the featured card changes later, the abstraction may stop helping and start getting in the way.

From a technical point of view, the reuse is valid. From a product point of view, it may be solving the wrong problem.

## A Better Fit

```jsx
function RegularProductCard({ price, image, url }) {
  return (
    <div>
      <span>{price}</span>
      <img src={image} onClick={() => navigateTo(url)} />
    </div>
  );
}

function FeaturedProductCard({ price, image, url }) {
  return (
    <div style={styles.featuredCard}>
      <Tag />
      <span>{price}</span>
      <Button />
      <img src={image} onClick={() => navigateTo(url)} />
    </div>
  );
}
```

Yes, this duplicates a small amount of code. That is fine.

These two components are meant to evolve independently, so keeping them separate is often the cleaner choice. A little duplication is cheaper than forcing an abstraction that does not match the actual design.

## Conclusion

Do not reuse code blindly.

Similarity in implementation is not enough. Reuse should follow stable product rules, not temporary overlap. If two pieces of UI are supposed to become more different over time, separate implementations can be simpler, clearer, and more maintainable.
