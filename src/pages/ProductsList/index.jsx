import { useState } from 'react';
import {	Header,	InputWrapper,	StyledFontAwesomeIcon,	Gallery,	ProductInfo, Content} from './styles';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useProduct from '../../hooks/useProduct';
import { Wrapper, Sidebar, Modal, Input, ProductCard, Title, HrLine, Container} from '../../components';

const ProductsList = () => {
	const { listProducts } = useProduct();
	const [modalOpened, setModalOpened] = useState(false);
	const [productId, setProductId] = useState('');
	const [search, setSearch] = useState('');

	function handleOpenModal(id) {
		const productSelected = listProducts.filter((item) => item.id === id);
		setProductId(productSelected);
		setModalOpened(true);
	}

	const filteredProducts = listProducts.filter((item) =>
		item.nome.toLowerCase().includes(search.toLowerCase())
	);

	function priceSort() {
		const sortedProducts = filteredProducts.sort(function (a, b) {
			return a.preco - b.preco;
		});
		console.log(sortedProducts);
	}

	return (
		<Wrapper>
			<Sidebar />
			<Container>
				<Content>
				<Title>Lista de Medicamentos</Title>
				<HrLine />
				<Header>
					<InputWrapper>
						<Input
							type="text"
							value={search}
							placeholder="Encontre um medicamento..."
							onChange={(e) => setSearch(e.target.value)}
						/>
						<StyledFontAwesomeIcon icon={faMagnifyingGlass} />
					</InputWrapper>
					{/* <button onClick={priceSort}>Ordenar por preço</button> */}
				</Header>

				<Gallery>
					<>
						{filteredProducts.length === 0 ? (
							<p>Medicamento não encontrado...</p>
						) : (
							<>
								{filteredProducts.map((product, index) => (
									<ProductCard
										key={index}
										product={product}
										onClick={() => handleOpenModal(product.id)}
									/>
								))}
							</>
						)}
					</>
					<Modal
						open={modalOpened}
						onClose={() => setModalOpened(!modalOpened)}
						product={productId}>
						<ProductInfo>
							<h3>{productId[0]?.nome}</h3>
							<hr />
							<p><strong>Laboratório</strong> {productId[0]?.laboratorio}</p>
							<p><strong>Dosagem</strong> {productId[0]?.dosagem}</p>
							<p><strong>Preço</strong> R$ {productId[0]?.preco}</p>
							<p><strong>Tipo</strong> {productId[0]?.tipo}</p>
						<p>
							<strong>Descrição</strong><br /> {productId[0]?.descricao}
						</p>
						</ProductInfo>
					</Modal>
				</Gallery>
				</Content>
			</Container>
		</Wrapper>
	);
};

export default ProductsList;
