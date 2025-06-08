import { FC, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { RECIPE_INFO_DATA } from "../model";
import styles from "./recipe-heading.styles";

import {
	IRecipe,
	RecipeInfoCard,
	useGetAllUserFavorites
} from "@/src/entities/recipe";

import { useUser } from "@/src/entities/user/hooks/useUser";
import { FavoritesButton } from "@/src/features/favorites-button";
import { IMAGES } from "@/src/shared/assets";

interface IRecipeHeadingProps {
	card: IRecipe;
}

export const RecipeHeading: FC<IRecipeHeadingProps> = ({ card }) => {
	const { user } = useUser();
	const [isFavorite, setIsFavorite] = useState<boolean>(false);
	const data = [card?.calories, card?.cookTime, card?.serveTo];
	const userEmail = user?.email || "test@gmail.com";

	const { data: favorites } = useGetAllUserFavorites({
		email: userEmail
	});

	const params = {
		userEmail: userEmail,
		recipeDocumentId: card.documentId
	};

	const favoriteCard = favorites?.find(
		(favorite) => favorite?.recipeDocumentId === card?.documentId
	);

	useEffect(() => {
		setIsFavorite(!!favoriteCard);
	}, [favoriteCard]);

	const handleOnChange = () => {
		setIsFavorite(!isFavorite);
	};

	// Dynamic image selection
	const IMAGE_MAP: Record<string, any> = {
		chicken: IMAGES.chicken,
		beef: IMAGES.beef,
		pasta: IMAGES.pasta,
		salad: IMAGES.salad,
		fish: IMAGES.fish,
		mutton: IMAGES.mutton,
		stew: IMAGES.stew,
		beef: IMAGES.beef,
		// Add more mappings as needed
	};

	const normalize = (str: string) =>
	str.toLowerCase().replace(/[\s-_]/g, "");

const getImageSource = () => {
	const ingredientNames = (card.ingredients || [])
		.map((item) => item.name)
		.join(" ");

	const combinedText = normalize(`${ingredientNames} ${card.recipeName || ""}`);

	for (let key in IMAGE_MAP) {
		if (combinedText.includes(normalize(key))) {
			return IMAGE_MAP[key];
		}
	}

	return IMAGES.photo2; // Fallback image
};


	return (
		<View style={styles.container}>
			<Image source={getImageSource()} style={styles.image} />
			<Text style={styles.name}>{card?.recipeName}</Text>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Description</Text>
				<FavoritesButton
					id={favoriteCard?.documentId || ""}
					params={params}
					isFavorite={isFavorite}
					handleOnChange={handleOnChange}
				/>
			</View>

			<Text style={styles.description}>{card?.description}</Text>

			<View style={styles.infoCards}>
				{RECIPE_INFO_DATA.map(({ icon, name, unit }, index) => (
					<RecipeInfoCard
						key={name}
						icon={icon}
						name={name}
						unit={unit}
						quantity={data[index]}
					/>
				))}
			</View>
		</View>
	);
};
