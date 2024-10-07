import SwiftUI

struct SuccessView: View {
    @State private var navigateToEmailAndPhone = false
    
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "checkmark.circle.fill")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 40, height: 40)
                .foregroundColor(.green)
            
            Text("Success!")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Your onboarding process has been completed successfully.")
                .font(.body)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
       
        .navigationBarBackButtonHidden(true)
    }
}

struct SuccessView_Previews: PreviewProvider {
    static var previews: some View {
        SuccessView()
    }
}
