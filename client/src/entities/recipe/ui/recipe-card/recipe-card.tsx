import { useRouter } from "expo-router";
import { FC } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View
} from "react-native";

import { IRecipe } from "../../types";

import styles from "./recipe-card.styles";
import { IMAGES } from "@/src/shared/assets"; // Ensure this includes your image mappings

interface IRecipeCardProps extends TouchableOpacityProps {
	card: IRecipe;
}

export const RecipeCard: FC<IRecipeCardProps> = ({ card, ...props }) => {
	const router = useRouter();

	const handleOnPress = (card: IRecipe) => {
		router.push({
			pathname: "/recipe-info",
			params: { recipeId: card?.documentId }
		});
	};

	// Optional: Use a map for image selection
	const IMAGE_MAP: Record<string, any> = {
		chicken: IMAGES.chicken,
		beef: IMAGES.beef,
		pasta: IMAGES.pasta,
		salad: IMAGES.salad,
		fish: IMAGES.fish,
		beef: IMAGES.beef,
		mutton: IMAGES.mutton,
		stew: IMAGES.stew,
		// Add more as needed
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
		<TouchableOpacity
			style={styles.container}
			{...props}
			onPress={() => handleOnPress(card)}
		>
			<Image source={getImageSource()} style={styles.image} />
			<View style={styles.titleWrapper}>
				<Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
					{card.recipeName}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
