export enum Models {
    DEEPSEEK_R1 = "deepseek/deepseek-r1:free",
    DEEPSEEK_R1_DISTILL_LLAMA_70B = "deepseek/deepseek-r1-distill-llama-70b:free",
    DEEPSEEK_V3 = "deepseek/deepseek-chat:free",
    GOOGLE_GEMINI_2_FLASH_LITE = "google/gemini-2.0-flash-lite-preview-02-05:free",
    GOOGLE_GEMINI_2_FLASH_THINKING_EXP = "google/gemini-2.0-flash-thinking-exp:free",
    GOOGLE_GEMINI_2_PRO_EXP = "google/gemini-2.0-pro-exp-02-05:free",
    META_LLAMA_3_3_70B_INSTRUCT = "meta-llama/llama-3.3-70b-instruct:free",
    NVIDIA_LLAMA_3_1_NEMOTRON_70B = "nvidia/llama-3.1-nemotron-70b-instruct:free",
    OPENCHAT_3_5_7B = "openchat/openchat-7b:free",
    QWEN_V1_PLUS = "qwen/qwen-vl-plus:free",
    QWEN_2_5_V1_72B_INSTRUCT = "qwen/qwen2.5-vl-72b-instruct:free"
}

export enum MaleImages {
    angry = "/angry-man.png",
    happy = "/happy-man.png",
    neutral = "/neutral-man.png",
    sad = "/sad-man.png"
}

export enum FemaleImages {
    angry = "/angry-woman.png",
    happy = "/happy-woman.png",
    sad = "/sad-woman.png"
}

export const MaleImagesList = [MaleImages.neutral, MaleImages.angry, MaleImages.happy, MaleImages.sad]
export const FemaleImagesList = [ FemaleImages.happy, FemaleImages.angry, FemaleImages.sad]