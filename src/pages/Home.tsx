import Slider from "../components/Slider";
import ProductPage from "./ProductPage";
import Category from "../components/Category";
export default function Home() {
    return (
        <section>
            <Slider />
            <ProductPage />
            <Category />
        </section>
    );
}
