"""
Playwright verification script for oh-my-copilot core pages.
Tests homepage, blog list, blog post, and about page render correctly.
Server must already be running at localhost:3000.
"""

from playwright.sync_api import sync_playwright
import os

BASE_URL = "http://localhost:3000"
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

def take_screenshot(page, name: str) -> None:
    path = os.path.join(SCREENSHOTS_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)
    print(f"  📸 Screenshot: {path}")

def test_homepage(page) -> None:
    print("\n🔍 Testing Homepage (/)...")
    page.goto(f"{BASE_URL}/", wait_until="networkidle")
    take_screenshot(page, "01-homepage-desktop")

    # Check hero section
    h1 = page.locator("h1").first
    assert h1.is_visible(), "H1 not visible on homepage"
    title = h1.inner_text()
    print(f"  ✅ Hero h1: '{title}'")

    # Check navbar
    nav = page.locator("nav[aria-label='Main navigation']")
    assert nav.is_visible(), "Main navbar not found"
    print("  ✅ Navbar visible")

    # Check blog/about links in navbar
    blog_link = page.locator("a[href='/blog']").first
    assert blog_link.is_visible(), "/blog link not visible"
    print("  ✅ /blog nav link visible")

    # Check ThemeSelector buttons
    theme_group = page.locator("[role='group'][aria-label='Theme selector']")
    assert theme_group.count() > 0, "ThemeSelector not found"
    buttons = theme_group.locator("button")
    assert buttons.count() == 3, f"Expected 3 theme buttons, got {buttons.count()}"
    print("  ✅ ThemeSelector has 3 buttons (Light, Dark, Auto)")

    # Check footer
    footer = page.locator("footer")
    assert footer.is_visible(), "Footer not visible"
    print("  ✅ Footer visible")

    # Mobile screenshot
    page.set_viewport_size({"width": 375, "height": 812})
    take_screenshot(page, "01-homepage-mobile")
    page.set_viewport_size({"width": 1280, "height": 800})

def test_blog_list(page) -> None:
    print("\n🔍 Testing Blog List (/blog)...")
    page.goto(f"{BASE_URL}/blog", wait_until="networkidle")
    take_screenshot(page, "02-blog-list-desktop")

    h1 = page.locator("h1").first
    assert h1.is_visible(), "Blog page H1 not found"
    print(f"  ✅ H1: '{h1.inner_text()}'")

    # Should have at least one article (we have 6 markdown files)
    articles = page.locator("article")
    count = articles.count()
    assert count > 0, f"No articles found on blog page"
    print(f"  ✅ Found {count} article(s)")

    # Featured post should have 'Featured' badge
    featured_badge = page.locator("text=Featured").first
    assert featured_badge.is_visible(), "'Featured' badge not found on blog list"
    print("  ✅ Featured badge visible")

def test_blog_post(page) -> None:
    print("\n🔍 Testing Blog Post (/blog/Confusions-about-parseInt)...")
    page.goto(f"{BASE_URL}/blog/Confusions-about-parseInt", wait_until="networkidle")
    take_screenshot(page, "03-blog-post-desktop")

    # Breadcrumb
    breadcrumb = page.locator("nav[aria-label='Breadcrumb']")
    assert breadcrumb.is_visible(), "Breadcrumb not found"
    print("  ✅ Breadcrumb visible")

    # Post title
    h1 = page.locator("h1").first
    assert h1.is_visible(), "Post H1 not visible"
    print(f"  ✅ Post title: '{h1.inner_text()}'")

    # Content rendered (should have code blocks from the markdown)
    content = page.locator("article.prose-content")
    assert content.count() > 0, "prose-content article not found"
    print("  ✅ Prose content rendered")

    # Back link
    back_link = page.locator("a[href='/blog']").last
    assert back_link.is_visible(), "Back to blog link not visible"
    print("  ✅ Back to blog link visible")

def test_about_page(page) -> None:
    print("\n🔍 Testing About (/about)...")
    page.goto(f"{BASE_URL}/about", wait_until="networkidle")
    take_screenshot(page, "04-about-desktop")

    h1 = page.locator("h1").first
    assert h1.is_visible(), "About H1 not found"
    print(f"  ✅ H1: '{h1.inner_text()}'")

    # Both sections should be present
    blog_section = page.locator("#about-blog-heading")
    author_section = page.locator("#about-author-heading")
    assert blog_section.count() > 0, "Blog intro section heading not found"
    assert author_section.count() > 0, "Author section heading not found"
    print("  ✅ Blog intro section visible")
    print("  ✅ Author section visible")

def test_theme_toggle(page) -> None:
    print("\n🔍 Testing theme toggle...")
    page.goto(f"{BASE_URL}/", wait_until="networkidle")

    buttons = page.locator("[role='group'][aria-label='Theme selector'] button")
    # Click Dark
    buttons.nth(1).click()
    page.wait_for_timeout(400)
    data_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
    assert data_theme == "dark", f"Expected data-theme=dark, got {data_theme}"
    take_screenshot(page, "05-theme-dark")
    print("  ✅ Dark theme applied (data-theme=dark)")

    # Click Light
    buttons.nth(0).click()
    page.wait_for_timeout(400)
    data_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
    assert data_theme == "light", f"Expected data-theme=light, got {data_theme}"
    take_screenshot(page, "06-theme-light")
    print("  ✅ Light theme applied (data-theme=light)")

    # Click Auto
    buttons.nth(2).click()
    page.wait_for_timeout(400)
    data_theme = page.evaluate("document.documentElement.getAttribute('data-theme')")
    assert data_theme is None, f"Expected data-theme=null (auto), got {data_theme}"
    print("  ✅ Auto theme applied (data-theme removed)")

def test_404(page) -> None:
    print("\n🔍 Testing 404 for unknown slug...")
    response = page.goto(f"{BASE_URL}/blog/this-post-does-not-exist", wait_until="networkidle")
    assert response is not None and response.status == 404, f"Expected 404, got {response.status if response else 'no response'}"
    take_screenshot(page, "07-blog-404")
    print("  ✅ 404 returned for unknown blog slug")

def main() -> None:
    print(f"🚀 Starting oh-my-copilot verification at {BASE_URL}")
    print(f"📁 Screenshots → {SCREENSHOTS_DIR}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        try:
            test_homepage(page)
            test_blog_list(page)
            test_blog_post(page)
            test_about_page(page)
            test_theme_toggle(page)
            test_404(page)
            print("\n✅ All tests passed!")
        except AssertionError as e:
            print(f"\n❌ Test failed: {e}")
            take_screenshot(page, "FAILURE")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    main()
