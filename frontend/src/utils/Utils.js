
export const getEpmtyModel = () => {
    var podcast = {"tagsFromPhoto":{'Tree': 7, 'Vacation': 7, 'Fun': 7, 'Dress': 6, 'Plant': 6, 'Leisure': 6, 'Photography': 6, 'Sky': 5, 'Architecture': 4, 'Text': 4, 'Blue': 3, 'Pink': 3, 'Flower': 3, 'House': 3, 'Recreation': 3, 'Grass': 3, 'Happy': 3, 'Smile': 3, 'Event': 3, 'Tourism': 3, 'Yellow': 3, 'Brand': 3, 'Community': 3, 'Font': 3, 'Beauty': 2, 'Interior design': 2, 'Floral design': 2, 'Leg': 2, 'Photograph': 2, 'Clothing': 2, 'Botany': 2, 'Spring': 2, 'Landscape': 2, 'Leaf': 2, 'Woody plant': 2, 'Wilderness': 2, 'Cloud': 2, 'Rock': 2, 'Ocean': 2, 'Sea': 2, 'Shore': 2, 'T-shirt': 2, 'Public space': 2, 'Town': 2, 'Photo caption': 2, 'Website': 2, 'Media': 2, 'Team': 2, 'Floristry': 1, 'Bouquet': 1, 'Flower Arranging': 1, 'Photo shoot': 1, 'Electric blue': 1, 'Model': 1, 'Fashion': 1, 'Head': 1, 'Hairstyle': 1, 'Eyebrow': 1, 'Skin': 1, 'Lip': 1, 'Shoulder': 1, 'Face': 1, 'Hair': 1, 'Centrepiece': 1, 'Curtain': 1, 'Room': 1, 'Textile': 1, 'Formal wear': 1, 'Wedding': 1, 'Ceremony': 1, 'Love': 1, 'Bride': 1, 'Forehead': 1, 'Hug': 1, 'Interaction': 1, 'Romance': 1, 'Honeymoon': 1, 'Suit': 1, 'Outerwear': 1, 'Sleeve': 1, 'Product': 1, 'Champagne stemware': 1, 'Glasses': 1, 'Drink': 1, 'Plastic wrap': 1, 'Costume': 1, 'Landscaping': 1, 'Yard': 1, 'Walkway': 1, 'Garden': 1, 'Daylily': 1, 'Groundcover': 1, 'Petal': 1, 'Flowering plant': 1, 'Temple': 1, 'Estate': 1, 'Church': 1, 'Place of worship': 1, 'Building': 1, 'Chapel': 1, 'Road': 1, 'Bedrock': 1, 'Outcrop': 1, 'Boulder': 1, 'Lake': 1, 'Water': 1, 'Wood': 1, 'Sand': 1, 'Beach': 1, 'Coast': 1, 'Games': 1, 'Tackle': 1, 'Cheering': 1, 'Artificial turf': 1, 'Team sport': 1, 'City': 1, 'Travel': 1, 'Youth': 1, 'Social group': 1, 'Human settlement': 1, 'Urban area': 1, 'Daytime': 1, 'Roof': 1, 'People': 1, 'Table': 1, 'Art': 1, 'Mural': 1, 'Neighbourhood': 1, 'Microphone': 1, 'Performance': 1, 'Advertising': 1, 'Poster': 1, 'Competition': 1, 'Animation': 1, 'Presentation': 1, 'Line': 1}, "countries": ['RU', 'RU', 'RU', 'RU', 'RU', 'RU'], "solvency": 2.128205128205128}

     return podcast
}
export const getScoreColor = (score) => {
        var color = {background: '#FD99A1'}
        if (score >= 350 && score < 650){
            color = {background: '#FD99A1'}
        } else if (score >= 650 && score < 800){
            color = {background: '#FEE7AF'}
        } else if (score >= 800 && score < 1000){
            color = {background: '#FEE7AF'}
        } else if (score >= 1000 & score <= 1250){
            color = {background: '#99EAB8'}
        }
     return color
}
export const getRelation = (relation) => {
    // 1 — не женат/не замужем;
    // 2 — есть друг/есть подруга;
    // 3 — помолвлен/помолвлена;
    // 4 — женат/замужем;
    // 5 — всё сложно;
    // 6 — в активном поиске;
    // 7 — влюблён/влюблена;
    // 8 — в гражданском браке;
    // 0 — не указано. 
        switch (relation){
            case 0:
                return "не указано" 
            case 1:
                return "не женат/не замужем" 
            case 2:
                return "есть друг/есть подруга" 
            case 3:
                return "помолвлен/помолвлена" 
            case 4:
                return "женат/замужем" 
            case 5:
                return "всё сложно" 
            case 6:
                return "в активном поиске" 
            case 7:
                return "влюблён/влюблена" 
            case 8:
                return "в гражданском браке" 
        }
}
export const hasChildren = (labels) => {
    var hasChild = false
    labels.forEach(label => {
       if (label.name.includes("Child") || label.name.includes("Kid") || label.name.includes("Baby")){
            hasChild = true
       }
   });
   return hasChild
}